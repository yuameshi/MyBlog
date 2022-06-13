---
title: 前Blog发展历程
tags:
  - 迁移自旧Blog
id: '26'
categories:
  - - 迁移自旧Blog
date: 2020-04-01 11:40:00
---

曾经，我的Blog是在学校自己写的（）

那时，我的HTML功底很差，排版很简陋，只能写一些简单的流式段落。(应该是这么叫的……吧？)

在一开始的时候，我的页面全是各种`<p align="center"></p>` 。嘛，后来我看了一下IIS的初始页面，认识了CSS，然后加了text-align，把所有的`<p>`都换成了`<br>`

老的Index↓

![](https://blog-old.yuameshi.top/passages/20200401/oldIndex.jpg)

嘛，大概长这样(怀旧一波)↑

其实也不算是一个Blog，倒是有点像商业网站 （还长得贼丑）

后来呢，一个名叫qwe的网友给了我一个随机壁纸的js，然后我开了他的js，把所有壁纸连着js一起下载下来了，然后...，把我IP给ban了，现在想来如果去掉HTTP请求refer应该能跨过这个block（大雾）（这是今天刚加的），到现在我都上不去。

然后呢，我页面一多起来，我的下方版权信息和顶部导航栏（对，就是那个黑黑的憨憨导航栏）写起来就很麻烦，在研究怎么批量引入版权信息，那些icon和css引用，上网查了好多资料。最后呢因为上边的Js事件我明白了可以直接`document.write`批量写入 。（注：现在都是`document.createElement`了）

最近吧，某个DrBlack群(以下简称黑群)的群友让我挂了个网页（对，就是那个Windows Touko，整个页面都是我写的，耗了我一个早上）。 于是

我寻思着得改一下UI了，WordPress要注册，Typecho要PHP环境(你现在也用WP/PHP啊喂)，所以就又花了半天去写了个新的UI，就是现在那个CaoCho，你也可以称为CaoPress。后来我又陆陆续续加了一个Live2D看板娘，一个播放器(感谢LRain大佬)。 然后大概就变成现在的样子了。

![](https://blog-old.yuameshi.top/passages/20200401/nowadays.jpg)

现在的样子（样子奇葩的很）