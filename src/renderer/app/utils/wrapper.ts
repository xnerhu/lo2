import { withRouter } from 'react-router';
import { observer } from 'mobx-react-lite';

export const observableWithRouter = (component: React.FunctionComponent): React.FunctionComponent => {
  return withRouter(observer(component)) as any;
}
