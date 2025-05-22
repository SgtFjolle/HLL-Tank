
document.addEventListener('DOMContentLoaded', () => {
  const imageMap = {
    german: {
      "German Army": "german.jpg",
      "German Army Winter Camo": "german_winter.jpg",
      "German Africa Corps": "german_africa.jpg"
    },
    us: {
      "United States Army": "us.jpg",
      "United States Army Winter Camo": "us_winter.jpg"
    },
    soviet: {
      "Soviet Armed Forces": "soviet.jpg"
    },
    british: {
      "British Army": "british.jpg",
      "British Eighth Army": "british_eighth.jpg"
    }
  };

  const mapData = {
    "Carentan": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Driel": { allies: { category: 'british', variation: 'British Army' }, axis: { category: 'german', variation: 'German Army' } },
    "El Alamein": { allies: { category: 'british', variation: 'British Eighth Army' }, axis: { category: 'german', variation: 'German Africa Corps' } },
    "Elsenborn Ridge": { allies: { category: 'us', variation: 'United States Army Winter Camo' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Foy": { allies: { category: 'us', variation: 'United States Army Winter Camo' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Hill 400": { allies: { category: 'us', variation: 'United States Army Winter Camo' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Hürtgen Forest": { allies: { category: 'us', variation: 'United States Army Winter Camo' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Kharkov": { allies: { category: 'soviet', variation: 'Soviet Armed Forces' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Kursk": { allies: { category: 'soviet', variation: 'Soviet Armed Forces' }, axis: { category: 'german', variation: 'German Army' } },
    "Mortain": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Omaha Beach": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Purple Heart Lane": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Remagen": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Sainte-Marie-du-Mont": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Sainte-Mère-Église": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } },
    "Stalingrad": { allies: { category: 'soviet', variation: 'Soviet Armed Forces' }, axis: { category: 'german', variation: 'German Army Winter Camo' } },
    "Tobruk": { allies: { category: 'british', variation: 'British Eighth Army' }, axis: { category: 'german', variation: 'German Africa Corps' } },
    "Utah Beach": { allies: { category: 'us', variation: 'United States Army' }, axis: { category: 'german', variation: 'German Army' } }
  };

  const categorySelect = document.getElementById('category-select');
  const variationButtons = document.getElementById('variation-buttons');
  const armyImage = document.getElementById('army-image');
  const mapSelect = document.getElementById('map-select');
  const mapResult = document.getElementById('map-result');
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  const modeToggle = document.getElementById('mode-toggle');

  let fromMapBlock = false;

  function updateVariations() {
    const category = categorySelect.value;
    const variations = imageMap[category];
    variationButtons.innerHTML = '';
    Object.entries(variations).forEach(([variation, path], index) => {
      const btn = document.createElement('button');
      btn.textContent = variation;
      btn.onclick = () => {
        showImage(path, variation);
        document.querySelectorAll('#variation-buttons button')
                .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      variationButtons.appendChild(btn);
      if (!fromMapBlock && index === 0) btn.click();
    });
    fromMapBlock = false;
  }

  function showImage(path, alt) {
    armyImage.src = path;
    armyImage.alt = alt;
  }

  categorySelect.addEventListener('change', updateVariations);

  Object.keys(imageMap).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    categorySelect.appendChild(option);
  });

  mapSelect.addEventListener('change', () => {
    const map = mapSelect.value;
    if (!mapData[map]) return;
    const { allies, axis } = mapData[map];
    mapResult.innerHTML = `
      <p>This map is played by:</p>
      <div><strong>ALLIES:</strong> <button data-cat="${allies.category}" data-var="${allies.variation}">${allies.variation}</button></div>
      <div><strong>AXIS:</strong> <button data-cat="${axis.category}" data-var="${axis.variation}">${axis.variation}</button></div>
    `;
    mapResult.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        categorySelect.value = button.dataset.cat;
        fromMapBlock = true;
        updateVariations();
        setTimeout(() => {
          document.querySelectorAll("#variation-buttons button").forEach(b => {
            if (b.textContent === button.dataset.var) b.click();
          });
        }, 10);
      });
    });
  });

  fullscreenToggle.addEventListener("click", () => {
    document.body.classList.toggle("fullscreen-mode");
  });

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  categorySelect.value = "german";
  updateVariations();
});
