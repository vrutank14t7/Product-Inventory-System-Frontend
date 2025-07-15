import { createTheme } from '@mui/material/styles';
import { colors } from '../constant/colors'; 

export function theme(customization) {
  let textPrimary;
  let textSecondary;
  let textDark;
  let textHint;
  let background;
  let paper;
  let menuCaption;
  let textInversePrimary;

  switch (customization.navType) {
    case 'light':
    default:
      textPrimary = textInversePrimary = menuCaption = colors.TEXT_PRIMARY;
      textSecondary = colors.TEXT_SECONDARY;
      textDark = colors.TEXT_DARK;
      textHint = colors.TEXT_HINT;
      background = colors.BACKGROUND;
      paper = colors.PAPER;
      break;
  }

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1440
      }
    },
    direction: 'ltr',
    palette: {
      mode: 'light',
      common: {
        black: colors.PAPER_DARK
      },
      primary: {
        light: colors.PRIMARY_LIGHT,
        main: colors.PRIMARY,
        dark: colors.PRIMARY_DARK,
        100: colors.PRIMARY_100
      },
      secondary: {
        light: colors.SECONDARY_LIGHT,
        main: colors.SECONDARY,
        dark: colors.SECONDARY_DARK
      },
      error: {
        light: colors.ERROR_LIGHT,
        main: colors.ERROR,
        dark: colors.ERROR_DARK
      },
      warning: {
        light: colors.WARNING_LIGHT,
        main: colors.WARNING,
        dark: colors.WARNING_DARK
      },
      info: {
        light: colors.INFO_LIGHT,
        main: colors.INFO,
        dark: colors.INFO_DARK
      },
      success: {
        light: colors.SUCCESS_LIGHT,
        main: colors.SUCCESS,
        dark: colors.SUCCESS_DARK
      },
      grey: {
        300: colors.GREY_300,
        400: colors.GREY_400 // Ensure this value is defined in your colors.js
      },
      bg: {
        100: colors.BG_100
      },
      textDark: {
        color: textDark
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
        dark: textDark,
        hint: textHint
      },
      background: {
        paper: paper,
        default: background
      }
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
      h6: {
        fontWeight: 600,
        color: textSecondary,
        fontSize: '0.875rem'
      },
      h5: {
        fontSize: '1.125rem',
        color: textSecondary,
        fontWeight: 600
      },
      h4: {
        fontSize: '1.25rem',
        color: textSecondary,
        fontWeight: 500
      },
      h3: {
        fontSize: '1.5rem',
        color: textDark,
        fontWeight: 600
      },
      h2: {
        fontSize: '2rem',
        color: textDark,
        fontWeight: 600
      },
      h1: {
        fontSize: '2.2rem',
        color: textDark,
        fontWeight: 600
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: textSecondary,
        lineHeight: '1.643em'
      },
      subtitle2: {
        fontSize: '0.8125rem',
        fontWeight: 400
      },
      caption: {
        fontSize: '0.68rem',
        color: textHint,
        fontWeight: 500
      },
      body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.643em'
      },
      body2: {
        letterSpacing: '0em',
        fontWeight: 400,
        lineHeight: '1.643em'
      },
      menuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: colors.PRIMARY,
        padding: '5px 15px 5px',
        textTransform: 'uppercase',
        marginTop: '10px'
      },
      subMenuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 400,
        color: menuCaption,
        textTransform: 'capitalize'
      }
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            overflow: 'hidden'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.3rem'
          },
          fontSizeInherit: {
            fontSize: 'inherit'
          },
          fontSizeLarge: {
            fontSize: '2.1875rem'
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: textInversePrimary,
            paddingTop: '12px',
            paddingBottom: '12px',
            '&.Mui-selected': {
              '& .MuiListItemIcon-root': {
                color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              },
              color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY
            },
            '&:hover': {
              backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              '& .MuiListItemIcon-root': {
                color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              }
            },
            button: {
              '&:hover': {
                backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              }
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: textInversePrimary,
            paddingTop: '12px',
            paddingBottom: '12px',
            '&.Mui-selected': {
              '& .MuiListItemIcon-root': {
                color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              },
              color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY
            },
            '&:hover': {
              backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY,
              '& .MuiListItemIcon-root': {
                color: customization.navType === 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              }
            },
            button: {
              '&:hover': {
                backgroundColor: customization.navType !== 'dark' ? colors.MENU_HOVER : colors.PRIMARY
              }
            }
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '36px',
            color: textInversePrimary
          }
        }
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: 'none'
          }
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '0.875rem'
          },
          content: {
            color: textSecondary,
            fontWeight: 500
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow: '0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%)'
          },
          rounded: {
            borderRadius: '10px'
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            color: textDark,
            padding: '24px'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '24px'
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: '24px'
          }
        }
      }
    }
  });
}

export default theme;
