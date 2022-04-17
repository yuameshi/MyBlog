---
title: 给适用于Windows的Linux子系统(第二代)添加图形界面
tags:
  - KDE
  - Linux子系统
  - Win10
  - Windows Subsystem Linux
  - Windows10
  - WSL
  - WSL2
  - 图形界面
id: '460'
categories:
  - - 伪*Server运维
  - - 开发
date: 2021-05-29 07:24:39
headerBG: https://i0.wp.com/www.han-han.xyz/wp-content/uploads/2021/05/image-12.png?fit=1442%2C946&ssl=1
---

> 警告  
> **此内容仅适用于Windows 10 2004(OS:19041)及以上版本，先前版本并不支持Windows Subsystem Linux 2，笔者也并未对其测试桌面体验的可行性**

## 配置系统环境

要切换到第二代WSL，我们需要在**权限提升的**Powershell(以管理员身份运行)键入以下指令：

```powershell
#安装WSL模块
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
#安装虚拟机平台（WSL2特性）
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

![](/wp-content/uploads/2021/05/image-3.png)

配置功能

在配置完成后，我们需要安装WSL2的内核更新包，[点击下载](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)，然后安装即可。

在下载和安装的过程中，我们来进行一些简要的配置，修改内存、交换设定等，因为WSL2默认可以使用的内存大小为主机的`80%`，对于Linux而言即使装了桌面，我也就600MiB左右，分多了反而有可能卡主机的Windows。

打开Windows资源管理器，在地址栏输入 `%UserProfile%` 并回车，然后在该目录下创建一个文件, 名字为 `.wslconfig` ,写入内容示例如下，其中`memory`选项对应内存大小，`swap`对应交换大小

```
[wsl2]
memory=2GB
swap=2GB
localhostForwarding=true
```

[![](/wp-content/uploads/2021/05/image-4.png)](https://www.yuameshi.top/wp-content/uploads/2021/05/image-4.png)

.wslconfig

将以上步骤均做完后，您可以重新启动您的计算机，进行功能配置。

重新启动后，我们要将WSL 2设置为默认版本，需要在Powershell中键入`wsl --set-default-version 2`

在在一切完成后，你可以到Microsoft Store安装Linux发行版，这里我采用[Ubuntu 20.04LTS](https://www.microsoft.com/store/productId/9N6SVWS3RX71) 。

安装完成后打开Ubuntu，他会让你进行一些基本配置，如设置用户名密码等。

## 安装Linux图形化套件及配置

重新启动后，启动安装的WSL发行版，创建初始账户，更新包，然后安装`xrdp`、`dbus-x11`、`kde-full`(这将会占用您大约3.7GB的磁盘空间)，

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install xrdp kde-full dbus-x11 -y
```

请注意，如果出现如下图所示的提示时，输入您当前账户的密码即可，在您输入任何字符后，画面不会有变化，但是实际上是输入了的。

![](/wp-content/uploads/2021/05/image-5.png)

然后按以下代码键入：

```bash
#配置xrdp默认启动环境
sudo sed -i.bak '/fi/a #xrdp multiple users configuration \n startkde \n' /etc/xrdp/startwm.sh
#开启端口及重启xrdp服务
sudo ufw allow 3389/tcp
sudo /etc/init.d/xrdp restart
```

## 准备连接WSL

在终端输入：`ifconfig`，若没有该包则使用`sudo apt install ifconfig -y && ifconfig`，并记住红框内的数字（每次启动均不同）

![](/wp-content/uploads/2021/05/image-6.png)

获取IP地址

然后在Windows下启动远程桌面客户端（按下Win+S并输入rd选择如图选项即可）

![](/wp-content/uploads/2021/05/image-8.png)

启动远程桌面客户端

然后再客户端内键入上一步获取的IP地址，并点击"连接"

然后远程桌面客户端会提示有安全风险，直接确定即可。

![](/wp-content/uploads/2021/05/image-9.png)

连接WSL

然后就会开启一个登陆页面，在这里输入您在WSL中的账号和密码，并单击Login。

[![](/wp-content/uploads/2021/05/image-10.png)](https://www.yuameshi.top/wp-content/uploads/2021/05/image-10.png)

登录XRDP

然后就可以看到KDE的初始画面了。

[![](/wp-content/uploads/2021/05/image-12.png)](https://www.yuameshi.top/wp-content/uploads/2021/05/image-12.png)

这不是初始画面（）