import './App.css'
import Dashboard from './pages/Dashboard'
import CityDetail from './pages/CityDetail'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/theme-provider'
import Layout from './components/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorPage from './pages/ErrorPage'

const queryClient = new QueryClient()
function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
<BrowserRouter>
<Layout>
  <Routes>
    <Route path='/' element = {<Dashboard/>}/>
    <Route path='/city/:cityName' element = {<CityDetail/>}/>
    <Route path='*' element = {<ErrorPage/>}></Route>
  </Routes>
</Layout>

</BrowserRouter>
    </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
