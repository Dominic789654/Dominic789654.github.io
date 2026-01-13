import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ScrollProgress } from './components/ScrollProgress';
import { About } from './components/About';
import { News } from './components/News';
import { Research } from './components/Research';
import { Publications } from './components/Publications';
import { Experience } from './components/Experience';
import { Awards } from './components/Awards';
import { Service } from './components/Service';
import { Interests } from './components/Interests';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ScrollProgress />
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <About />
          <News />
          <Research />
          <Publications />
          <Experience />
          <Awards />
          <Service />
          <Interests />
        </main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;