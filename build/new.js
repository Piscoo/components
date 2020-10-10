"use strict";

process.on("exit", () => {
  console.log();
});

if (!process.argv[2]) {
  console.error("[组件名]必填 - Please enter new component name");
  process.exit(1);
}

const path = require("path");
const fs = require("fs");
const fileSave = require("file-save");
const uppercamelcase = require("uppercamelcase");
const { execSync } = require("child_process");
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);

const gitMsg = execSync("git config --list", { encoding: "utf-8" });
const userMsg = gitMsg.split("\n").reduce((acc, cur) => {
  if (cur.indexOf("=") > -1) {
    const [key, value] = cur.match(/[^=]+/g);
    acc[key] = value;
  }
  return acc;
}, {});
const username = uppercamelcase(userMsg["user.name"]);

const PackagePath = getPath(componentname, "src");
const StoryPath = getPath("", "stories");

function getPath(filename, context) {
  return path.join(__dirname, "../", context, username, filename);
}
const Files = [
  {
    filename: path.join(PackagePath, "index.js"),
    content: `import ${ComponentName} from './src/main';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
    filename: path.join(PackagePath, "src/main.vue"),
    content: `<template>
<div class="ap-${componentname}">
  <!-- @slot default slot
   -->
  <slot>hello world!</slot>
</div>
</template>

<script>
export default {
  name: 'Ap${ComponentName}'
};
</script>`
  }
];

const storyFiles = [
  {
    filename: path.join(StoryPath, `${componentname}/Normal.story.vue`),
    content: `
<template>
  <${ComponentName} @click.native="log">hello normal!</${ComponentName}>
</template>

<script>
import ${ComponentName} from "@/${username}/${componentname}";

export default {
  name: "Normal",
  components: {
    ${ComponentName}
  },
  methods: {
    log() {
      console.log(\`hello max.... from console alert\`);
    }
  }
};
</script>
`
  },
  {
    filename: path.join(StoryPath, `${componentname}/Another.story.vue`),
    content: `
<template>
  <${ComponentName} @click.native="log">hello, this is another story for the same component</${ComponentName}>
</template>

<script>
import ${ComponentName} from "@/${username}/${componentname}";

export default {
  name: "Normal",
  components: {
    ${ComponentName}
  },
  methods: {
    log() {
      console.log(\`hello max.... from console alert\`);
    }
  }
};
</script>
`
  },
  {
    filename: path.join(StoryPath, `${componentname}.stories.jsx`),
    content: `
import NormalStory from './${componentname}/Normal.story.vue'
import AnotherStory from './${componentname}/Another.story.vue'

export default {
    title: '组件列表/${username}/${ComponentName}'
}

export const normal = () => ({
    render(h) {
        return <NormalStory></NormalStory>
    }
})

export const another = () => ({
    render(h) {
        return <AnotherStory></AnotherStory>
    }
})
`
  }
];

[...Files, ...storyFiles].forEach(file => {
  fileSave(file.filename)
    .write(file.content, "utf8")
    .end("\n");
});

console.log("DONE!");
