# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 避免无效推理： 哪些三段论是无效的。
  - 基于存在量词的蕴含关系就不能在推导出带有全称量词的结论。小前提的出现了存在量词“有些”，就不能在推导出带有全称量词的“所以”的结论。
  - 如果三段论中的两个前提，有的使用了全称量词，有的使用了存在量词，那么就无法得出使用全称量词的结论，但是可以得出使用存在量词的结论。
> 只有存在量词的三段论推理
 - 如果三个命题都使用了存在量词，这个三段论是无效论证。

> 三段论中能成立的
1. 当大前提和小前提都使用了全称量词，结论当中无论是用了全称量词还是存在量词，有一定成立。
2. 大前提使用了存在量词，小前提使用了全称量词，如果结论中使用存在量词，这个三段论也成立。

> 含有否定词的三段论
1. 女人都很美，美都让人心情好，女人让人心情好。

## 三段论
- 消除否定词
- 原命题和它的逆否命题是相等的。

> 并非所以的疾病都是由细菌引起的  -- 逆否命题  --> 有些疾病不是由细菌引起的。
- 抗生素只对某些由细菌引起的疾病有效  -- 逆否命题  --> 抗生素对任何不是由细菌引起的疾病都无效

> 原命题 P 则 Q （P -> Q）
> 否命题 ~P 则 ~Q (~p -> ~Q)
> 逆命题 Q 则 P (Q -> P)
> 逆否命题 ~Q 则 ~P （~Q -> ~P）
