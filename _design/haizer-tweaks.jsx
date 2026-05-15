/* haizer-tweaks.jsx — Tweaks panel for the Haizer homepage */

const HAIZER_TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS;

function HaizerTweaks() {
  const [t, setTweak] = useTweaks(HAIZER_TWEAK_DEFAULTS);
  const root = document.documentElement;
  const body = document.body;

  // Apply CSS-variable + class side effects whenever a tweak changes
  React.useEffect(() => {
    root.style.setProperty('--emerald', t.primary);
    // derive hover ~ slightly darker via mix-blend approximation: hand-curated set
    const hoverMap = {
      '#064E3B': '#043B2C', // emerald
      '#1A3A5C': '#102A45', // navy
      '#7A2E2E': '#5F1F1F', // brick
      '#3F2A6E': '#2D1E55', // plum
    };
    root.style.setProperty('--emerald-hover', hoverMap[t.primary] || t.primary);
    // subtle = 12% alpha on the chosen hue (cheap approximation: use existing)
    const subtleMap = {
      '#064E3B': '#D1FAE5',
      '#1A3A5C': '#DEE9F5',
      '#7A2E2E': '#F5DCDC',
      '#3F2A6E': '#E3DCF5',
    };
    root.style.setProperty('--emerald-subtle', subtleMap[t.primary] || '#D1FAE5');

    root.style.setProperty('--page', t.page);
    // surface-2 derived per page
    const surfMap = { '#FAF8F3': '#F5F2EC', '#FFFFFF': '#F7F5F0', '#0F1410': '#1A2120' };
    root.style.setProperty('--surface-2', surfMap[t.page] || '#F5F2EC');
    // text + card on dark
    if (t.page === '#0F1410') {
      root.style.setProperty('--card', '#171F1A');
      root.style.setProperty('--text-1', '#F2EFE8');
      root.style.setProperty('--text-2', '#A0AAA3');
      root.style.setProperty('--text-3', '#6E7A72');
      root.style.setProperty('--border', '#2A322D');
      root.style.setProperty('--border-hover', '#3A443D');
    } else {
      root.style.setProperty('--card', '#FFFFFF');
      root.style.setProperty('--text-1', '#1A1A1A');
      root.style.setProperty('--text-2', '#64748B');
      root.style.setProperty('--text-3', '#94A3B8');
      root.style.setProperty('--border', '#E2E8F0');
      root.style.setProperty('--border-hover', '#CBD5E1');
    }

    root.style.setProperty('--r-card', t.cardRadius + 'px');

    // Body classes for variants
    body.classList.toggle('density-compact', t.density === 'compact');
    body.classList.toggle('density-comfy',   t.density === 'comfy');

    body.classList.toggle('hero-minimal', t.heroVariant === 'minimal');

    body.classList.toggle('search-segmented', t.searchType === 'segmented');

    body.classList.remove('feat-4up', 'feat-3up');
    if (t.featGrid !== 'auto') body.classList.add('feat-' + t.featGrid);

    body.classList.remove('cities-43', 'cities-11', 'cities-169');
    body.classList.add('cities-' + (t.cityAspect === '4:3' ? '43' : t.cityAspect === '1:1' ? '11' : '169'));

    body.classList.remove('connector-solid', 'connector-none');
    if (t.connector === 'solid') body.classList.add('connector-solid');
    if (t.connector === 'none')  body.classList.add('connector-none');

    body.classList.toggle('motion-off', !t.motion);

    // Copy edits applied to live text
    const hh = document.getElementById('heroHeadline');
    if (hh) {
      const parts = (t.heading || '').split('Direct.');
      if (parts.length === 2) {
        hh.innerHTML = parts[0] + '<span class="accent">Direct.</span>' + parts[1];
      } else {
        hh.textContent = t.heading || '';
      }
    }
    const hs = document.getElementById('heroSub');     if (hs) hs.textContent = t.sub;
    const ch = document.getElementById('ctaHeadline'); if (ch) ch.textContent = t.ctaHeading;
    const cs = document.getElementById('ctaSub');      if (cs) cs.textContent = t.ctaSub;
  }, [t.primary, t.page, t.density, t.cardRadius, t.heroVariant, t.searchType, t.featGrid, t.cityAspect, t.connector, t.motion, t.heading, t.sub, t.ctaHeading, t.ctaSub]);

  return (
    <TweaksPanel title="Haizer · Tweaks">
      <TweakSection label="Brand color" />
      <TweakColor
        label="Primary"
        value={t.primary}
        options={['#064E3B', '#1A3A5C', '#7A2E2E', '#3F2A6E']}
        onChange={(v) => setTweak('primary', v)}
      />

      <TweakSection label="Surface" />
      <TweakColor
        label="Page background"
        value={t.page}
        options={['#FAF8F3', '#FFFFFF', '#0F1410']}
        onChange={(v) => setTweak('page', v)}
      />

      <TweakSection label="Spacing &amp; shape" />
      <TweakRadio
        label="Density"
        value={t.density}
        options={['compact', 'regular', 'comfy']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakSlider
        label="Card radius"
        value={t.cardRadius}
        min={4} max={24} step={1} unit="px"
        onChange={(v) => setTweak('cardRadius', v)}
      />

      <TweakSection label="Hero" />
      <TweakRadio
        label="Variant"
        value={t.heroVariant}
        options={['full', 'minimal']}
        onChange={(v) => setTweak('heroVariant', v)}
      />
      <TweakRadio
        label="Search type"
        value={t.searchType}
        options={['dropdown', 'segmented']}
        onChange={(v) => setTweak('searchType', v)}
      />
      <TweakText
        label="Headline"
        value={t.heading}
        onChange={(v) => setTweak('heading', v)}
      />
      <TweakText
        label="Subhead"
        value={t.sub}
        onChange={(v) => setTweak('sub', v)}
      />

      <TweakSection label="Featured grid" />
      <TweakRadio
        label="Columns"
        value={t.featGrid}
        options={['auto', '4up', '3up']}
        onChange={(v) => setTweak('featGrid', v)}
      />

      <TweakSection label="City tiles" />
      <TweakRadio
        label="Aspect"
        value={t.cityAspect}
        options={['4:3', '1:1', '16:9']}
        onChange={(v) => setTweak('cityAspect', v)}
      />

      <TweakSection label="How it works" />
      <TweakRadio
        label="Connector"
        value={t.connector}
        options={['dashed', 'solid', 'none']}
        onChange={(v) => setTweak('connector', v)}
      />

      <TweakSection label="CTA band" />
      <TweakText
        label="Headline"
        value={t.ctaHeading}
        onChange={(v) => setTweak('ctaHeading', v)}
      />
      <TweakText
        label="Sub"
        value={t.ctaSub}
        onChange={(v) => setTweak('ctaSub', v)}
      />

      <TweakSection label="Motion" />
      <TweakToggle
        label="Animations"
        value={t.motion}
        onChange={(v) => setTweak('motion', v)}
      />
    </TweaksPanel>
  );
}

const haizerTweaksRoot = document.createElement('div');
document.body.appendChild(haizerTweaksRoot);
ReactDOM.createRoot(haizerTweaksRoot).render(<HaizerTweaks />);
