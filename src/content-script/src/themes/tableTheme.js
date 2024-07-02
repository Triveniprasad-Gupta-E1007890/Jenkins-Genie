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
        color: '#ffffff !important',
        _dark: {
          bgColor: '#195b3d',
        }
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
        border: 'unset',
        _dark: {
          color: '#e3e3e3 !important'
        },

        a: {
          _dark: {
            color: '#42a847 !important'
          }
        } ,

        p: {
          _dark: {
            color: '#e3e3e3 !important'
          }
        } 
      }
    },
    'tr:nth-child(2n-1)': {
      td: {
        backgroundColor: '#f9f9f9 !important',
        _dark: {
          backgroundColor: '#37465f !important',
        }
      }
    },
    'tr:nth-child(2n)': {
      td: {
        backgroundColor: '#EFEFEF !important',
        _dark: {
          backgroundColor: '#364257 !important',
        }
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
