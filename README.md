# bookcase

A Simple single-page web application which manages a collection of books. A User is able to add, modify and delete books.

## Usage

1. Clone repo
   ```bash
   git clone https://github.com/k1mtap/bookcase.git
   ```
2. Start the Bookcase (uses Docker)

   ```bash
   npm run startBookcase
   ```

## Unit tests

```bash
npm test
```

## Build

```bash
npm run build
```

## NPM Workspace helpers

Running a command for one package only

```bash
npm run <command> -w=@bookcase/<package-name>
```

Installing packageA as a dependency for packageB

```bash
npm install @bookcase/packageA -w=@bookcase/packageB
```
