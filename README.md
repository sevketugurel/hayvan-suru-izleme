# Burdur Projesi - Hayvan Sürü İzleme

Bu proje, hayvan sürülerini izlemek için geliştirilen bir React uygulamasıdır.

## Özellikler

- Hayvan takibi
- Sürü yönetimi
- Detaylı raporlama

## Teknik Altyapı

React + TypeScript + Vite ile geliştirilmiştir.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ESLint Konfigürasyonu

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
