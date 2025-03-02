import * as stylex from '@stylexjs/stylex';

const colors = stylex.create({
  alwaysWhite: {
    color: '#ffffff',
  },
  beta: {
    color: 'var(--barcelona-beta-text)',
  },
  link: {
    color: 'var(--barcelona-link-text)',
  },
  primary: {
    color: '#282829',
  },
  secondary: {
    color: '#65686c',
  },
});

const weightNormal = stylex.create({
  default: {
    fontWeight: 400,
  },
});

const weightSemibold = stylex.create({
  default: {
    fontWeight: 600,
  },
});

const weightBold = stylex.create({
  default: {
    fontWeight: 700,
  },
});

const weightHeavy = stylex.create({
  default: {
    fontWeight: 800,
  },
});

const fontSize = stylex.create({
  body: {
    fontSize: 15,
  },
  body2: {
    fontSize: 13,
  },
  display: {
    fontSize: 12,
  },
  footnote: {
    fontSize: 11,
  },
  headline1: {
    fontSize: 32,
  },
  headline2: {
    fontSize: 21,
  },
  label: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
  },
  bodyLink3: {
    fontSize: 14
  }
});

export default function createBaseTextConfig(
  weight: 'normal' | 'semibold' | 'bold' | 'heavy'
) {
  let fontWeight = weightNormal;

  switch (weight) {
    case 'semibold':
      fontWeight = weightSemibold as unknown as typeof fontWeight;
      break;
    case 'bold':
      fontWeight = weightBold as unknown as typeof fontWeight;
      break;
    case 'heavy':
      fontWeight = weightHeavy as unknown as typeof fontWeight;
  }

  return {
    colors: {
      alwaysWhite: colors.alwaysWhite,
      betaText: colors.beta,
      link: colors.link,
      primaryText: colors.primary,
      secondaryText: colors.secondary,
    },
    styles: {
      body: {
        lineHeight: '1.4',
        style: makeNamespace({
          fontSize: fontSize.body.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      body2: {
        lineHeight: '1.4',
        style: makeNamespace({
          fontSize: fontSize.body2.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      display: {
        lineHeight: '1.15',
        style: makeNamespace({
          fontSize: fontSize.display.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      footnote: {
        lineHeight: '1.4',
        style: makeNamespace({
          fontSize: fontSize.footnote.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      headline1: {
        lineHeight: '1.25',
        style: makeNamespace({
          fontSize: fontSize.headline1.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      headline2: {
        lineHeight: '1.25',
        style: makeNamespace({
          fontSize: fontSize.headline2.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      label: {
        lineHeight: '1.3125',
        style: makeNamespace({
          fontSize: fontSize.label.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      title: {
        lineHeight: '1.25',
        style: makeNamespace({
          fontSize: fontSize.title.fontSize,
          fontWeight: fontWeight['default'].fontWeight,
        }),
      },
      bodyLink3: {
        lineHeight: '1.3333',
        style: makeNamespace({
          fontSize: fontSize.bodyLink3.fontSize,
          fontWeight: fontWeight['default'].fontWeight
        })
      }
    },
  };
}

function makeNamespace(styles: stylex.StaticStyles) {
  return {
    ...styles,
    $$css: true,
  };
}
