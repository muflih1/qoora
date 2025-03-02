import * as stylex from '@stylexjs/stylex';
import BaseTextLink from './Button/BaseTextLink';
import BaseTextInput from './BaseInput';
import Button from './Button/Button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useQuestionComposerDialog from './QuestionComposerDialog/useQuestionComposerDialog';
import HomeSolidIconSvg from './Icons/HomeSolidIcon.svg';
import AnswerSolidIconSvg from './Icons/AnswerSolidIcon.svg';
import HomeFilledIconSvg from './Icons/HomeFilledIcon.svg';
import AnswerFilledIconSvg from './Icons/AnswerFilledIcon.svg';

const navigationMenus = [
  {
    link: '/',
    tooltipText: 'Home',
    Icon: HomeSolidIconSvg,
    ActiveIcon: HomeFilledIconSvg,
  },
  {
    link: '/answer',
    tooltipText: 'Answer',
    Icon: AnswerSolidIconSvg,
    ActiveIcon: AnswerFilledIconSvg,
  },
];

export default function Navbar() {
  const openQuestionComposerDialog = useQuestionComposerDialog({
    creationSource: 'top_nav',
  });
  return (
    <>
      <div
        role='none'
        {...stylex.props(styles.headerOffest)}
      />
      <div
        role='banner'
        {...stylex.props(styles.root)}
      >
        <div {...stylex.props(styles.container)}>
          <BaseTextLink
            href={'/'}
            color='brand'
            underlineOnHover={false}
          >
            <div
              dir='auto'
              {...stylex.props(styles.logoText)}
            >
              Qoora
            </div>
          </BaseTextLink>
          {navigationMenus.map(item => (
            <MenuItem
              key={item.link}
              {...item}
            />
          ))}
          <div {...stylex.props(styles.searchForm)}>
            <label {...stylex.props(styles.searchFormControlWrapper)}>
              <span {...stylex.props(styles.searchFormSearchIconSvgContainer)}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  {...stylex.props(styles.searchFormSearchIconSvg)}
                >
                  <path
                    d='M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm10.45 2.95L16 16l4.95 4.95Z'
                    stroke='#939598'
                    strokeWidth='1.5'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
              </span>
              <BaseTextInput
                type='text'
                placeholder='Search Qoora'
                xstyle={styles.searchFormControl}
              />
            </label>
          </div>
          <Button
            label='Add question'
            type='destructive'
            size='small'
            onPress={openQuestionComposerDialog}
          />
        </div>
      </div>
    </>
  );
}

function MenuItem({ link, tooltipText, Icon, ActiveIcon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={link}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      title={tooltipText}
    >
      {({ isActive }) => (
        <div {...stylex.props(styles.menuItemRoot)}>
          <span {...stylex.props(styles.menuItemIconContainer)}>
            {isActive ? (
              <ActiveIcon {...stylex.props(styles.menuItemIconSvg)} />
            ) : (
              <Icon {...stylex.props(styles.menuItemIconSvg)} />
            )}
          </span>
          {isActive && (
            <div
              role='none'
              {...stylex.props(styles.menuItemActiveIndicator)}
            />
          )}
          <div
            role='none'
            {...stylex.props(
              styles.menuItemOverlay,
              hovered && styles.menuItemOverlayHovered
            )}
          />
        </div>
      )}
    </NavLink>
  );
}

const styles = stylex.create({
  menuItemRoot: {
    paddingStart: 8,
    paddingEnd: 8,
    display: 'flex',
    position: 'relative',
    height: 49,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemIconContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 28,
    width: 28,
  },
  menuItemIconSvg: {
    width: '100%',
    height: '100%',
  },
  menuItemActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    start: 8,
    end: 8,
    height: 3,
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    backgroundColor: '#b92b27',
  },
  menuItemOverlay: {
    transitionProperty: 'opacity, transform',
    transitionDuration: '180ms',
    transitionTimingFunction: 'cubic-bezier(.4,0,.6,1)',
    position: 'absolute',
    top: 3,
    end: 0,
    bottom: 3,
    start: 0,
    opacity: 0,
    transform: 'scale(.95)',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
  },
  menuItemOverlayHovered: {
    transitionDuration: '0s',
    opacity: 1,
    transform: 'none',
  },
  headerOffest: {
    height: 50,
  },
  root: {
    position: 'fixed',
    top: 0,
    start: 0,
    end: 0,
    minHeight: 50,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.04)',
    borderBottomColor: '#dee0e1',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255,255,255,.85)',
    backdropFilter: 'blur(14px)',
    zIndex: 300,
  },
  container: {
    maxWidth: 1100,
    marginEnd: 'auto',
    marginStart: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    fontSize: 31,
    lineHeight: 32 / 31,
    fontWeight: 700,
    color: '#b92b27',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    maxWidth: '100%',
    marginEnd: 24,
  },
  searchForm: {
    marginStart: 24,
    marginEnd: 24,
    width: 324,
  },
  searchFormControlWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchFormSearchIconSvgContainer: {
    width: 16,
    height: 16,
    position: 'absolute',
    marginStart: 8,
    marginBottom: 3,
    pointerEvents: 'none',
  },
  searchFormSearchIconSvg: {
    width: '100%',
    height: '100%',
  },
  searchFormControl: {
    height: 36,
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    borderBottomStartRadius: 3,
    borderBottomEndRadius: 3,
    borderTopColor: {
      default: '#dee0e1',
      ':focus': '#1877f2',
    },
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderEndColor: {
      default: '#dee0e1',
      ':focus': '#1877f2',
    },
    borderEndStyle: 'solid',
    borderEndWidth: 1,
    borderBottomColor: {
      default: '#dee0e1',
      ':focus': '#1877f2',
    },
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderStartColor: {
      default: '#dee0e1',
      ':focus': '#1877f2',
    },
    ':focus': {
      boxShadow: 'rgb(235, 240, 255) 0 0 0 2px',
    },
    borderStartStyle: 'solid',
    borderStartWidth: 1,
    paddingTop: 7,
    paddingEnd: 8,
    paddingBottom: 9,
    paddingStart: 28,
    fontSize: 13,
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '180ms',
    transitionTimingFunction: 'cubic-bezier(.4,0,.6,1)',
    width: '100%',
  },
});
