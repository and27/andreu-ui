import './App.css'
import Button from './primitives/Button/Button'
import Checkbox from './primitives/Checkbox/Checkbox'
import Input from './primitives/Input/Input'
import Label from './primitives/Label/Label'
import Radio from './primitives/Radio/Radio'
import Switch from './primitives/Switch/Switch'

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">andreu/ui</p>
        <h1>Component showcase</h1>
        <p className="app__subtitle">
          Token-driven primitives with accessible defaults.
        </p>
      </header>

      <section className="app__section" aria-labelledby="buttons-title">
        <h2 id="buttons-title">Buttons</h2>
        <div className="app__row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="app__section" aria-labelledby="inputs-title">
        <h2 id="inputs-title">Inputs</h2>
        <div className="app__field">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" />
        </div>
        <div className="app__row">
          <div className="app__inline">
            <Checkbox id="marketing" />
            <Label htmlFor="marketing">Marketing emails</Label>
          </div>
          <div className="app__inline">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Notifications</Label>
          </div>
        </div>
        <div className="app__row" role="radiogroup" aria-label="Plan">
          <div className="app__inline">
            <Radio id="plan-basic" name="plan" defaultChecked />
            <Label htmlFor="plan-basic">Basic</Label>
          </div>
          <div className="app__inline">
            <Radio id="plan-pro" name="plan" />
            <Label htmlFor="plan-pro">Pro</Label>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
