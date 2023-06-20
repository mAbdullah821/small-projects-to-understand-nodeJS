# Directories Reorderer

To customize the app:

```
Change the configuration variables from "config.js" file.
```

---

Directory Name Must Follow This Pattern:

```
order- directoryName
```

One dash && one space are must.

#### Examples:

- 1- dirName
- 1.1- dirName
- 01- dirName
- 01.1- dirName

It also accepts the (%20) as an alternative for the space.

#### Examples:

- 1-%20dirName
- 1.1-%20dirName
- 01-%20dirName
- 01.1-%20dirName

---

### The app can:

1- Change the **order** of the directory to be:

```
newOrder- dirName
```

#### Examples:

- 1- dirName --Be--> 2- dirName
- 1- dirName --Be--> 5- dirName
- 3- dirName --Be--> 1- dirName

2- Change the **leading zeros** length of the directory order to be:

```
(any leading zeros length)order- dirName
```

#### Examples:

- 1- dirName --Be--> 01- dirName
- 1- dirName --Be--> 001- dirName
- 0001- dirName --Be--> 01- dirName

3- Change **both** the order and the leading zeros length to be:

```
(any leading zeros length)newOrder- dirName
```

#### Examples:

- 1- dirName --Be--> 02- dirName
- 1- dirName --Be--> 005- dirName
- 004- dirName --Be--> 02- dirName

**Note**: The same applied if we use the (%20) as an alternative for the space.
