---
title: 关于处理JS滚动事件中DOM操作的优化
date: 2022-05-14 13:56:18
tags: [JavaScript, 开发]
categories: 
  - - 开发
  - - JavaScript
---

最近不是在做MDx嘛（就现在这个主题），滚动的时候会将AppBar的站点名称替换成当前的页面名称，最近调试的时候看着DOM那里一直在闪，就想虽然这是刷新同一个文本，视觉上不会变动，但是他确实是一直在操作DOM的，这会不会对性能造成影响呢？

先说结论：会

~~心动不如行动~~ 想着就测了测，打开`about:blank`，在DOM栏里添加一个`div#123`。

切到console，分别输入
```javascript
// 无论内容是否相同都会刷新同一内容
console.log(performance.now());
for(let i=0;i<=1000;i++){
    document.getElementById('123').innerText='123';
}
console.log(performance.now());
// 23361.899999976158
// 23369
// 用时 233.7
```
和
```javascript
// 先判断内容是否相同，不相同才刷新
console.log(performance.now());
for(let i=0;i<=1000;i++){
    if(document.getElementById('123').innerText!='123'){
        document.getElementById('123').innerText='123';
    }
}
console.log(performance.now());
// 33920.19999998808
// 33924
// 用时 3.80000001192
```
结果在我意料之中，反复刷新DOM（即使是同一个内容）也会造成性能损失