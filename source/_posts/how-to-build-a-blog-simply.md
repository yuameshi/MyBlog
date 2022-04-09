---
title: 怎么自己简单地搭建一个的博客
tags:
  - 迁移自旧Blog
id: '35'
categories:
  - - 迁移自旧Blog
date: 2020-04-10 11:58:00
---

我是一个个人博客搭建者，自己搭了一个平时没什么人去的小网站。

如果是匿名用户，我是不太推荐用国内提供商的，国内提供商5Mbps就得几百一个月，而且如果不备案，只能IP访问，只能挂第三方备案过的域名，我是穷学生真的用不起，我妈也不给我身份证。

所以这边建议Vultr，2.5$挡 PacificRack的新春促销()，至于如何开的这种问题可以上百度/必应搜。

虽然1020GB的磁盘看起来不太够用，但是如果不是把网站做成离线下载啥的一般都是够用的。（我放了一个MC服务器，加了几十个插件，都没啥事，9.5GB左右）（MC不开了+现在内存不太够，如果有意象整MySQL的就最好上1GB）  
开服务器是很简单的，重要的不在服务器而在于内容，我搭建博客是找乐子，顺便学习HTML和ASP（ASP是啥垃圾玩意儿，ASP.NET才好（逃））。  
前面水了这么多，那就正式讲了：  
\*\*这边讲的是自己搭建（总不会买一个服务器也不会吧），基于Windows10，Windows Server系列可能会有所不同，针对中国电信/联通宽带用户，移动就不用想了，没公网IP，你还得用内网穿透或者上专线现在可以用IPv6。

1.打开**控制面板**

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200410/6cd3fab94e34c00fdee16a7d818405c960ca85c5.png@1320w_1308h.jpg)

1.打开控制面板

2.进入**程序和功能**

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200410/4e6cd9e427c875da72b1c8e55784361be1f83560.png@1320w_996h.jpg)

2.进入程序和功能

3.进入**启用或关闭Windows功能**

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200410/5752ac07026b314a8203bb7bcc277e2a64bd0bb1.png@1320w_996h.jpg)

进入启用或关闭Windows功能

4.Web核心必选，Internet Information Service内的项目可以看需求勾选

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200410/4c8b745e4a6f1bd0f17c4ae25d8b4b230862ec75.png@1246w_1180h.jpg)

选择需要的功能

记得IIS管理工具除了IIS6兼容性其他都得钩，不然后面配置其他东西很麻烦。  
完成之后点击确定。  
在功能配置完全之后，你访问127.0.0.1或者localhost都可以访问到这样一个页面

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/img/initial.jpg)

默认页面

这时候你来到`C:\inetpub\wwwroot`会有几个文件，这些是默认页面，都可以自行删除，然后放自己的页面进去。

* * *

  
其实基本到这里就结束了，静态页面也没什么问题了，不过如果要用动态页面（若无特殊说明，以下均指ASP页面）的话（比如意见反馈等等）还要配置一下。  
\*\*值得注意的是：如果需要动态页面支持，则需要在配置功能的页面勾选 “开发工具” 复选框。

打开IIS管理控制台

依次进入"IIS"选项卡

在IIS选项卡内，将几个被框住的部分改为True，点击右侧的"应用"

> 注意  
> **值得注意的是，有时候访问ASP页面会出现503/403错误，这个时候应该是缺少权限 所导致，我们需要给Everyone赋予读取和执行权限。**

写在最后：可能会有人问我，为什么不用PhP和PhP Study(这俩都不是一个东西好伐)，因为我真的好像看不懂PhP的一堆问号，而且也懒\[手动狗头\](我看你现在不是用的挺开心嘛)。  
而PhP Study好像不支持ASP（怎么可能支持嘛），如果你是PhP大佬，你大可以选择其他的，我只是一个建站半年的新手。

↑大 废 话

顺带一提：BiliBili上我也发了：[https://www.bilibili.com/read/cv5542828](https://www.bilibili.com/read/cv5542828)