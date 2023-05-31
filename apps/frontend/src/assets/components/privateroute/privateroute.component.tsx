import React from 'react';
import {Navigate} from 'react-router-dom';

import authService from '../../services/auth.service';

interface Props{
    minimumRole: string;
    children: React.ReactNode;
}

interface State{}

class PrivateRoute extends React.Component<Props,State> {
    constructor(props: Props){
        super(props);
    }

    hasMinimumRole(roles: Array<string>): Boolean{
        return roles.some((i: string) => authService.roleOrder.indexOf(i) >= authService.roleOrder.indexOf(this.props.minimumRole));
    }

    render() {
        const currentUser = authService.getCurrentUser();

        if (!currentUser.userId) {
            return <Navigate to="/login"/>
        }

        if (this.props.minimumRole && !this.hasMinimumRole(currentUser.roles)){
            return <Navigate to="/"/>
        }

        return this.props.children;
    }
}
  
export default PrivateRoute