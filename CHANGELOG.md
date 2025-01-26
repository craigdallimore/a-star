# @decoy9697/a-star

## 2.0.1

### Patch Changes

- f152dd0: Fixes an issue where the goal node is used instead of a neighbour, which can break paths that rely on generated spaces (such as GOAP).

## 2.0.0

### Major Changes

- 93e51c9: Adds a new required method to the API. You will need to implement `getId`.

## 1.1.0

### Minor Changes

- fb34b3f: Addresses an equality bug

## 1.0.0

### Major Changes

- 332f192: The toolchain the supports this library has been highly modified. This may alter how the module is exported. Check import locations.
