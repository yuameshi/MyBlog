---
title: 将WordPress迁移至Hexo
date: 2021-09-21 09:49:21
tags: 迁移,WordPress,Hexo,转移
headerBG: /wp-content/uploads/2021/09/transWHheadpic.png
---
>警告

>这篇文章没有任何图片，表述也较为简短
# 1.迁移文章
这里，我们借助一个Hexo的插件，您可以通过`npm i hexo-migrator-wordpress`来安装。

在安装过程中，您可以登录WordPress的控制面板，在`侧边栏的工具->导出->所有内容->下载导出的文件`来获取数据。
打开Powershell或命令提示符，然后来到您部署Hexo的目录，键入`hexo migrate wordpress 导出的文件路径`.
# 2.迁移图片并精简
下载您WordPress目录中的`wp-content\uploads\`文件夹放在`source\wp-content\uploads\`文件夹内

众所周知，在WordPress上传图片时，WordPress将生成多张图片，所以需要将目录下所有的带-**\*\*x\*\**的(例如-1024x775)的图片删除。
# 3.批量修改图片链接
紧接着，修改所有文件内的图片链接，建议使用带批量正则表达式查找替换的编辑器进行这一步骤，例如`VSCode`

使用VSCode打开您部署Hexo的文件夹，然后在左侧导航栏选择第二个图标，在上方的输入框内输入`-1024x.{3,4}`，仔细检查下方结果无误后，点击第二个输入框右侧的**全部替换**，然后在上方的输入框内输入`-.{3,4}x1024`，然后重复上述步骤。

最后，输入`-.{3,4}x.{3,4}`查看***MarkDown***文件内是否有遗漏的项目，然后替换。

# 至此，您的WordPress已经迁移到Hexo了