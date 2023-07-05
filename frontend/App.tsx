import {QueryClient, useQuery, QueryClientProvider} from "@tanstack/react-query";
import {Paper} from "@mui/material";
import { useTransition, animated } from '@react-spring/web'


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Message} from "./types.ts";

// Create a client
const queryClient = new QueryClient()


function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>

          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
              <div>
                  <Messages/>
              </div>
          </div>
        </QueryClientProvider>
    </>
  )
}


const fetchMessage = (channelID: string) => ()  : Promise<Message[]>  => fetch(`http://localhost:3000/forums/${channelID}/messages`).then(result => result.json() || [])


const FIRST_TOPIC_THREAD_ID = '1122868445231452241';
// const SECOND_TOPIC_THREAD_ID = '1122868654313308290';

function Messages() {

    const {status, data, error} = useQuery({
        queryFn: fetchMessage(FIRST_TOPIC_THREAD_ID),
        queryKey: ['messages']
    })

    const list = data ? [...data].reverse() : [];

    const [transitions, _] = useTransition(list, () => ({
        from: { opacity: .5 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
    }))

    if (status === 'loading') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: { (error instanceof Error ) ? error.message : null}</span>
    }


    return transitions ( (style, item) => <animated.div style={style}>
            <Paper sx={{m: 2}} elevation={5} >{ item?.content }</Paper>
        </animated.div>
    )
}

export default App
