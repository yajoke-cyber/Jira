# 项目使用库描述

使用 commitlint 规范 commit 格式，不符合格式的 commit 消息将会被拒绝，示例选取规则为 conventional

但是注意生成的 commitlint.config.js 文件需要使用 utf-8 编码，不然会报错

prettier 和 eslint 的冲突需要单独安装插件 eslint-config-prettier
保证项目在 commit 之后可以直接格式化
