import * as stylex from "@stylexjs/stylex"
import BaseText from "../../Typography/BaseText";
import SignInFormRenderer from "./SignInFormRenderer";

export default function SignInRenderer() {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.card)}>
        <BaseText
          size='headline1'
          weight='bold'
          color='primaryText'
          textAlign='center'
          xstyle={styles.heading}
        >
          Sign in to Qoora
        </BaseText>
        <SignInFormRenderer />
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heading: {
    marginBottom: 24,
  },
  card: {
    width: 400,
  },
})