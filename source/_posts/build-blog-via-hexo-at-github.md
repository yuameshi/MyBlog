---
title: 基于Hexo做一个位于GitHub的博客
tags:
  - 迁移自旧Blog
id: '53'
categories:
  - - 迁移自旧Blog
date: 2020-04-30 16:26:00
---

要进行这项工作，你的计算机上需要已经安装好：  
         1.Node.js 10.0或者更高（地址：[nodejs.org](http://nodejs.org)）  
         2.Git工具（地址：[git-scm.com/downloads](http://git-scm.com/downloads)；国内建议淘宝镜像[npm.taobao.org/mirrors/git-for-windows/](http://npm.taobao.org/mirrors/git-for-windows/)）

> 注意  
> **Git安装时需要允许命令行访问**

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/12f34b60f4ada343757dc46d198734611aec2f2f.png@1320w_996h.jpg)

要选带命令行的

除此之外，你还要准备一个`GitHub账户`。  
好，又水了很多，现在开始：

> Step-1
> 
> 登录你的GitHub账户（没有就去注册！），新建一个仓库，仓库名随便写,什么都不用管，直接创建。

> 注意  
> **如果填写"你的用户名.github.io"那么以后你的博客地址则为"你的用户名.github.io"，否则访问地址则为"你的用户名.github.io/仓库名/"**

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/eddd87b85f8158c15c69e8e8772bf3aac1f999f3.png@1320w_666h.jpg)

例如如图创建的代码仓库，访问地址为  
"i-am-a-loser-using-windows-server.github.io"

\*\*注意，创建完仓库最好不要直接上传文件，窗口最好也别关。

> Step-2：下载Hexo框架
> 
> 下载地址：[https://github.com/hexojs/hexo](https://github.com/hexojs/hexo)，直接下载Zip即可（其实感觉不用）

> Step-3：安装，部署并启动Hexo
> 
> 3.1 解压下载的Zip  
> 3.2 进入hexo-master，就是有一堆文件那个，在目录下按住Shift右击，选择 `在此处打开Powershell窗口(S)`

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/374d33eb045fb6ba1385a2676bfbf48479d8f184.png@1320w_996h.jpg)

选择 `在此处打开Powershell窗口(S)`

> 3.3 依次键入：

```
npm install hexo-cli -g
set-ExecutionPolicy RemoteSigned
hexo init 随便写一个名字
cd 刚刚写的名字
hexo server  #(或者简写hexo s)
```

到这里，你就成功地启动了本地的Hexo服务器，一般访问`localhost:4000`或者`127.0.0.1:4000`能够访问到Hexo的本地页面

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/212d18bde8bff5a2e782fcb151b4536d7d84e37d.png@1320w_702h.jpg)

正常的页面输出

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/f04d8f0349335beaf7319ff15115c5662c8488fa.png@1320w_702h.jpg)

此时按下Control+C可以停止本地服务器

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/73fdfea9f782d12bd0fc506d6eaf62f7c7787a30.png@1320w_702h.jpg)

默认Hexo页面

> 4.推送到GitHub仓库
> 
> 先按下Control+C停止本地服务器，你也可以新建一个Powershell窗口  
> 首先键入：hexo generate来生成静态页面

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/7eb00fe132f2c44c5d40a93f3d43f6b7c1fa555e.png@1320w_1360h.jpg)

生成静态页面

然后依次键入：

```
git init
git add .
git commit -m "随便写，这是提交描述"
```

键入`cd public`

还记得之前那个GitHub页面吗，现在打开它，将图中被框上的的两行字拷贝，然后键入到Powershell

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/964fd975ccd30311292f88f60cbbae14c61e10a2.png@1320w_670h.jpg)

将图中被框上的两行字拷贝，然后粘贴/键入到Powershell

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/3f6f64a2cfc745dd88f0660e37c091bf75301e30.png@1320w_936h.jpg)

这里是正常的Powershell提示

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/f58b05283b8a926fa54743357a0e3d9c670a3cf9.png@1320w_268h.jpg)

这里是正常的Powershell提示

> 如果出现如下图所示警告则键入：
> 
> `git config --global user.email "你的注册邮箱"`  
> 或：`  
> git config --global user.name "你的账户名"`

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/adbd0b0fa7b50f134230839d10ecafcfb6f6e909.png@1320w_398h.jpg)

如果出现如图所示警告则键入"git config --global user.email "注册邮箱""

             此时刷新GitHub页面，就能看到多了一些文件，此时访问"你的用户名.github.io"对于仓库名没有起为"你的用户名.github.io"的则访问"你的用户名.github.io/仓库名"应当就能看到与本地服务器显示一致的网页。

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/42e87010a7ae443a24be2603eacc123eeb0b1182.png@1320w_670h.jpg)

此时刷新GitHub页面，就能看到多了一些文件

此时访问GitHub Pages应当就能看到与本地服务器显示一致的网页

如果无法正常访问可以尝试查看`Settings`里的`GitHub Pages`

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200430/f51de6040afd838b7ff607a57f69913af0fdf1e0.png@1320w_666h.jpg)

如果无法正常访问可以尝试查看Settings里的GitHub Pages  
（这张图是正常的）

## 写在最后：

想要创建新的文章，请在博客目录里使用：`hexo new "标题"`，然后到`\source\_posts\文件名.md`里修改，格式为MarkDown。  

如果觉得丑，想换主题，可以去：[https://hexo.io/themes/](https://hexo.io/themes/)里查找主题更换。  
还可以加一些插件，可以去： [https://hexo.io/plugins/](https://hexo.io/plugins/)看  
\*\*换主题和加插件请仔细阅读官方的文档，Hexo的和主题的文档都得看。

以后推送到远端的仓库，都可以使用：

```
hexo generate
git add .
git commit -m "随便写，这是提交描述"
git push -u origin master
```

推送如果出现错误，可以看看强制推送：`git push -f -u origin master`（慎用）

​我不太确定码云(Gitee)有没有GitHub.io那一类服务，不过我看它的说明好像可以的亚子。

顺带一提：BiliBili上我也发了：[https://www.bilibili.com/read/cv5845316](https://www.bilibili.com/read/cv5845316)