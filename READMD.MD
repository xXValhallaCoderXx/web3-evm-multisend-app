
## PNPM Crashcourse

##### Run script in nested package
- pnpm -F blockchain run accounts

## Install Package to specific app
pnpm i @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion --filter web




## Prerequisites
- Ensure you have `pnpm` installed

# Initial Setup

- Run `pnpm i` to install all packages
- Run `pnpm compile` to compile contracts


## Testing



- run local node `pnpm -F blockchain run node`

### Development options

#### Full Development Environment
- Run `pnpm dev` to setup development environment with local chain

#### Run frontend development only
- Run `pnpm dev` to run the FE without a local chain


### Tips

- Generate seret key: openssl rand -base64 32