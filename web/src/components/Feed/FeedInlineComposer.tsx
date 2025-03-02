import * as stylex from '@stylexjs/stylex';
import CometClickable from '../Button/CometClickable';
import BaseLineClamp from '../Typography/BaseLineClamp';
import WebView from '../WebView';
import BaseText from '../Typography/BaseText';
import { useNavigate } from 'react-router';
import useQuestionComposerDialog from '../QuestionComposerDialog/useQuestionComposerDialog';

export default function FeedInlineComposer() {
  const navigate = useNavigate();
  const openQuestionComposerDialog = useQuestionComposerDialog({
    creationSource: 'top_of_feed',
  });

  return (
    <WebView xstyle={styles.card}>
      <WebView
        aria-label='Create question'
        xstyle={styles.body}
      >
        <WebView xstyle={styles.wrapper}>
          <h3
            dir='auto'
            {...stylex.props(styles.visuallyHidden)}
          >
            Create a post
          </h3>
          <CometClickable
            linkProps={{ url: '/' }}
            xstyle={styles.profilePic}
          >
            <WebView xstyle={styles.profilePicWrapper}>
              <img
                src='https://qph.cf2.quoracdn.net/main-thumb-1717237187-50-ckytscfzdwqbfvldwmobkqipfndzkvzg.jpeg'
                alt='Profile photo'
                {...stylex.props(styles.profilePicImg)}
              />
            </WebView>
          </CometClickable>
          <CometClickable
            xstyle={styles.wyom}
            onPress={openQuestionComposerDialog}
          >
            <div {...stylex.props(styles.placeholer)}>
              <BaseLineClamp lines={2}>What do you want to ask?</BaseLineClamp>
            </div>
          </CometClickable>
        </WebView>
        <WebView xstyle={styles.extras}>
          <CometClickable
            xstyle={styles.extrasPressable}
            onPress={openQuestionComposerDialog}
          >
            <div {...stylex.props(styles.row)}>
              <BaseText
                size='body2'
                color='secondaryText'
                weight='semibold'
              >
                Ask
              </BaseText>
            </div>
          </CometClickable>
          <CometClickable
            xstyle={styles.extrasPressable}
            onPress={() => navigate({ pathname: '/answer' })}
          >
            <div {...stylex.props(styles.row)}>
              <BaseText
                size='body2'
                color='secondaryText'
                weight='semibold'
              >
                Answer
              </BaseText>
            </div>
          </CometClickable>
        </WebView>
      </WebView>
    </WebView>
  );
}

const styles = stylex.create({
  card: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: '#fff',
    borderTopColor: '#dee0e1',
    borderEndColor: '#dee0e1',
    borderBottomColor: '#dee0e1',
    borderStartColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.04)',
    marginBottom: 8,
  },
  body: {
    paddingTop: 12,
    paddingEnd: 12,
    paddingBottom: 4,
    paddingStart: 12,
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    flexShrink: 1,
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  visuallyHidden: {
    height: 1,
    width: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    position: 'absolute',
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
  },
  profilePic: {
    display: 'flex',
    marginEnd: 8,
  },
  profilePicWrapper: {
    borderTopStartRadius: 9999,
    borderTopEndRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    position: 'relative',
    display: 'inline-block',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  profilePicImg: {
    display: 'block',
    maxWidth: '100%',
    minWidth: 32,
    width: 32,
    height: 32,
    position: 'relative',
  },
  wyom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingEnd: 12,
    paddingBottom: 8,
    paddingStart: 12,
    height: 32,
    minHeight: 32,
    flexGrow: 1,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    backgroundColor: '#f7f7f8',
    borderTopColor: '#dee0e1',
    borderEndColor: '#dee0e1',
    borderBottomColor: '#dee0e1',
    borderStartColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
  },
  placeholer: {
    color: '#939598',
    fontSize: 14,
    width: '100%',
    hyphens: 'auto',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  },
  extras: {
    display: 'flex',
    marginTop: 4,
  },
  extrasPressable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 12,
    paddingStart: 12,
    borderTopEndRadius: 9999,
    borderTopStartRadius: 9999,
    borderBottomEndRadius: 9999,
    borderBottomStartRadius: 9999,
    flexGrow: 1,
    flexShrink: 1,
    height: 30,
    transitionProperty: 'background-color',
    transitionDuration: '60ms',
    transitionTimingFunction: 'ease-out',
    backgroundColor: {
      default: 'transparent',
      ':hover': 'rgba(0, 0, 0, 0.03)',
      ':active': 'rgba(0, 0, 0, 0.03)',
    },
    ':active > div': { opacity: 0.75 },
  },
  row: {
    display: 'flex',
    transitionProperty: 'opacity',
    transitionDuration: '60ms',
    transitionTimingFunction: 'ease-in-out',
  },
  iconWrapper: {
    display: 'inline-flex',
    flexShrink: 0,
    marginEnd: 8,
    flexGrow: 0,
  },
  icon: {},
});
