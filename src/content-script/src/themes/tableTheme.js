import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  thead: {
    boxShadow: 'base',
    tr: {
      th: {
        bgColor: '#1E8422',
        fontSize: '14px',
        // color: '#ffffff' applied inline style
        },
      'th:first-child': {
        borderTopLeftRadius: '8px'
      },
      'th:last-child': {
        borderTopRightRadius: '8px'
      }
    }
  },
  tbody: {
    boxShadow: 'sm',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    tr: {
      td: {
        border: 'unset'
      }
    },
    'tr:nth-child(2n-1)': {
      td: {
        backgroundColor: '#f9f9f9 !important'
      }
    },
    'tr:nth-child(2n)': {
      td: {
        backgroundColor: '#EFEFEF !important'
      }
    },
    'tr:last-child': {
      'td:first-child': {
        borderBottomLeftRadius: '8px',
      },
      'td:last-child': {
        borderBottomRightRadius: '8px',
      }
    }
  }
})

export const tableTheme = defineMultiStyleConfig({ baseStyle })
