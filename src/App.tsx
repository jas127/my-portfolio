import { SoundProvider } from '@/lib/sound';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import { MainQuests, SideQuests } from '@/components/Quests';
import { Toolbox } from '@/components/Toolbox';
import { FieldNotes, CurrentlyCurious } from '@/components/Notes';
import { About, OpenDoor } from '@/components/About';
import Footer from '@/components/Footer';

function Site() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <MainQuests />
        <SideQuests />
        <Toolbox />
        <FieldNotes />
        <CurrentlyCurious />
        <About />
        <OpenDoor />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <Site />
    </SoundProvider>
  );
}
