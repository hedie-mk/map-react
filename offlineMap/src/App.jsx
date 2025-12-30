import NavMenu from './components/ui/NavMenu';
import MapPage from './pages/MapPage';
import "./App.css"
function App() {

  return (
    <div className="page" dir="rtl">
        
        <div className="sidebar">
            <NavMenu />
        </div>
        <main>
            <article className="content px-4">
                <MapPage />
            </article>
        </main>
    </div>
    
  )
}

export default App
