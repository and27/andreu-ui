import "./App.css";
import { Button } from "./primitives/Button";
import { Checkbox } from "./primitives/Checkbox";
import { Input } from "./primitives/Input";
import { Label } from "./primitives/Label";
import { RadioGroup, RadioGroupItem } from "./primitives/RadioGroup";
import { Select } from "./primitives/Select";
import { Switch } from "./primitives/Switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./composition/DropdownMenu";
import { Textarea } from "./primitives/Textarea";

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
        <div className="app__field">
          <Label htmlFor="plan">Plan</Label>
          <Select id="plan">
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </div>
        <div className="app__field">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Short bio" />
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
        <RadioGroup name="plan" label="Plan" defaultValue="basic">
          <RadioGroupItem id="plan-basic" value="basic">
            Basic
          </RadioGroupItem>
          <RadioGroupItem id="plan-pro" value="pro">
            Pro
          </RadioGroupItem>
        </RadioGroup>
      </section>

      <section className="app__section" aria-labelledby="menus-title">
        <h2 id="menus-title">Menus</h2>
        <DropdownMenu id="actions">
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem disabled>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
}

export default App;
