import React from 'react';
import {Navigate} from 'react-router-dom';

import authService from '../../services/auth.service';

interface Props{
    minimumRole: string;
    children: React.ReactNode;
}

interface State{
    hasVerified: Boolean;
    isVerified: Boolean;
}

class PrivateRoute extends React.Component<Props,State> {
    constructor(props: Props){
        super(props);

        this.state = {
            hasVerified: false,
            isVerified: false
        }
    }

    hasMinimumRole(roles: Array<string>): Boolean{
        return roles.some((i: string) => authService.roleOrder.indexOf(i) >= authService.roleOrder.indexOf(this.props.minimumRole));
    }

    componentDidMount(): void {
        authService.verifyLogin().then((response) => {
            this.setState({hasVerified: true, isVerified: response.status == 200})
        })
    }

    render() {
        const currentUser = authService.getCurrentUser();

        if(!currentUser.userId && this.state.hasVerified)
            return <Navigate to="/login"/>

        if(this.props.minimumRole && !this.hasMinimumRole(currentUser.roles || []) && this.state.hasVerified)
            return <Navigate to="/"/>

        return (this.state.hasVerified && this.state.isVerified) ? this.props.children : <></>
    }
}
  
export default PrivateRoute