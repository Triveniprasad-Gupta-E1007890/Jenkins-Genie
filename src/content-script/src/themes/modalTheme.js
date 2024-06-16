import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// const sizes = definePartsStyle({
//   dialog: {
//     borderRadius: 'xl',
//     width: '800px'
//   },
// })
const sizes = {
  xl: definePartsStyle({ dialog: {
    minW: 'fit-content'
  } })
}

export const modalTheme = defineMultiStyleConfig({
  sizes,
})