import styled from 'styled-components'
import React, {useEffect, useRef} from 'react'
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Message from './Message'

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )

    const [roomMessages, loading] = useCollection(
        roomId &&
        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
    )

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [roomId, loading, roomMessages])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong>
                                <StarBorderOutlined />
                            </h4>
                        </HeaderLeft>
        
                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>
        
                    <ChatMessages>
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data()
        
                            return (
                                <Message 
                                    key = {doc.id}
                                    message = {message}
                                    timestamp = {timestamp}
                                    user = {user}
                                    userImage = {userImage}
                                />
                            )
                        })}
                    </ChatMessages>
                    <ChatBottom ref={chatRef}/>
        
                    <ChatInput 
                        channelId = {roomId}
                        channelName = {roomDetails?.data().name}
                    />
                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 65px;
    margin-left: 10px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    >h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
        margin-top: 4px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 10px !important;
        font-size: 18px;
        margin-top: 3px;
    }
`

const ChatMessages = styled.div`

`

const ChatBottom = styled.div`
    padding-bottom: 90px;
`