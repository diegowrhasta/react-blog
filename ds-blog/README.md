# Introduction

Project in React which was ported entirely from scratch from a design: 
(The Personal Blog)[https://www.figma.com/community/file/1235152009438565697]. 
This was done alongside Vite as a bundler, one that has a fast Rust compiler, with 
modern features and overall a better experience than create react app or other 
options.

## Summary

This is a project that ports the entire design from Figma referenced in the _Introduction_ 
section, but also adds a distinct flavor to it, by extra additions such as animations, 
hovers, and overall the implementation of the design with good practices such as 
folder structure, style and component files, reusable components inspired by 
VSA (Vertical Slice Architecture), the implementation of a really simple store 
with _Elf.js_ and its observables capabitilies _(rxjs)_.

Other things worth of note is the aim for clean and redable code, thanks to the 
already built-in eslint configuration from Vue as well as the usage of the __StandardJS__
JavaScript coding standard, the whole project is aimed as staying consistent whilst 
also being readable (which in turn should be more maintainable).

## Extra Notes

It's worth noting that the advancements on Cascading Style Sheets were leveraged
in order to write styles in a more declarative, concise and readable manner, by 
adding nesting instead of writing everything on one level, thanks to these improvements 
in the native style sheets the usage of things such as SASS (scss) was discarded 
as it became redundant.

The idea was to make use of all basic features of React as well as good practices 
in modern web development with javascript and typescript in order to make a blog 
website that will be used personally for different topics.

## Libraries Used

- Elf.js
- rxjs
- React Router