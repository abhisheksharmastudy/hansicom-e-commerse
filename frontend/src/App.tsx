
import { Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <div className="dark relative">
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}

export default App
