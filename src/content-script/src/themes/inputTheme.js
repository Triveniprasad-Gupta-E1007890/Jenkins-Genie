import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  element: {
    cursor: 'pointer'
  },
  field: {
    border: '1px solid #909090 !important',
    _dark: {
      color: '#e3e3e3'
    }
  }
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
