import React from 'react'
// Import styled components
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { AccessTime, HelpOutline, SearchOutlined } from '@material-ui/icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

function Header() {
    const [user] = useAuthState(auth)
    return (
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
                <HeaderAvatar
                    alt={user?.displayName}
                    src={user?.photoURL}
                    onClick={() => auth.signOut()}
                />
                <AccessTime />
            </HeaderLeft>

            {/* Header Search */}
            <HeaderSearch>
                <SearchOutlined/>
                <input placeholder='Search'/>
            </HeaderSearch>

            {/* Header Right */}
            <HeaderRight>
                <HelpOutline />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

// All classes or Styled Components goes here
const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const HeaderSearch = styled.div`
    display: flex;
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    padding: 0 50px;
    color: grey;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: none;
        color: white;

        &:focus {
            outline: none;
        }
    }
`

const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 25px;
    }
`