import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import SidebarOptions from './SidebarOptions';

function Sidebar() {
    const [channels] = useCollection(db.collection('rooms'))
    const [user] = useAuthState(auth)

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>My Startup HQ</h2>
                    <h3>
                        <FiberManualRecord/>
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>
            
            <SidebarOptions Icon={InsertComment} title="Threads"/>
            <SidebarOptions Icon={Inbox} title="Mentions and Reactions"/>
            <SidebarOptions Icon={Drafts} title="Saved Items"/>
            <SidebarOptions Icon={BookmarkBorder} title="Channel Browser"/>
            <SidebarOptions Icon={PeopleAlt} title="People and user groups"/>
            <SidebarOptions Icon={Apps} title="Apps"/>
            <SidebarOptions Icon={FileCopy} title="File Browser"/>
            <SidebarOptions Icon={ExpandLess} title="Show Less"/>

            <hr />
            <SidebarOptions Icon={ExpandMore} title="Channels"/>
            
            <hr />
            <SidebarOptions Icon={Add} addChannelOption title="Add Channel"/>

            {channels?.docs.map(doc => (
                <SidebarOptions key={doc.id} id={doc.id} title={doc.data().name}/>
            ))}
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    margin-top: 60px;
    color: white;
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    overflow-y: scroll;

    >hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`

const SidebarHeader = styled.div`
    display: flex;
    flex: 1;
    height: fit-content;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    >.MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 50%;
    }
`

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    >h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    >h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`