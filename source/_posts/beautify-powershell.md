---
title: PowerShell美化 - 今月份的水博客
tags:
  - PowerShell
  - PS
  - Windows
  - 伪*Server运维
  - 系统
id: '589'
categories:
  - - 开发
  - - 日常
date: 2021-10-10 07:22:00

headerBG: /wp-content/uploads/2021/08/installModule.png
---

> 警告  
> **本篇文章的实际操作环境为Windows 11+Windows Terminal+Powershell 7.1.4 不同版本可能会存在兼容性问题**

## 1.安装模块

首先，使用提升的权限启动PowerShell，然后键入如下指令安装美化模块

```powershell
install-module posh-git
install-module oh-my-posh
```

> 在这一步操作时可能会发出如下提醒
> 
> You are installing the modules from an untrusted repository. If you trust this repository, change its  
> InstallationPolicy value by running the Set-PSRepository cmdlet. Are you sure you want to install the modules from  
> 'PSGallery'?  
> \[Y\] Yes \[A\] Yes to All \[N\] No \[L\] No to All \[S\] Suspend \[?\] Help (default is "N"):

输入A并回车以信任仓库。

![](/wp-content/uploads/2021/08/installModule.png)

## 2.启用模块

```powershell
import-module posh-git
import-module oh-my-posh
Set-PoshPrompt PowerLine
```

我听有人说这个得装GIT，不然会报错，请各位斟酌。

最后一条是设置主题，我这边设置了PowerLine，全部主题可以看[这里](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes)。

在输入上述代码块的最后一条命令后，您的终端样式应当会改变。

![](/wp-content/uploads/2021/08/QQ截图20210825082303.png)

>警告
>部分字体可能会出现不兼容的情况导致部分乱码，如上图，我这里建议采用`Source Code Pro`字体。或者克隆[这个](https://github.com/powerline/fonts)仓库，并使用PowerShell运行`install.ps1`再选择后缀带`for Powerline`的字体，如下图


![](/wp-content/uploads/2021/08/fonts.png)

## 设置配置文件以在启动时自动应用主题

输入`code $profile`，如果您没有安装VS Code并将其添加到PATH，请将`code`改为`notepad`或者你喜欢的文本编辑器。

在文件任意处添加以下内容并保存。

```powershell
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt PowerLine
```

![](/wp-content/uploads/2021/08/vsc.png)

## 然后你的Powershell美化工作就做完了（