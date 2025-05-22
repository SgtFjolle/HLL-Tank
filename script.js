
document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  const variationButtons = document.getElementById('variation-buttons');
  const armyImage = document.getElementById('army-image');
  const fullscreenToggle = document.getElementById('fullscreen-toggle');

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

  let fromMapBlock = false;

  function updateVariations() {
    const category = categorySelect.value;
    const variations = imageMap[category];
    variationButtons.innerHTML = "";
    Object.keys(variations).forEach((variation, index) => {
      const btn = document.createElement('button');
      btn.textContent = variation;
      btn.onclick = () => {
        showImage(category, variation);
        document.querySelectorAll('#variation-buttons button')
                .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      variationButtons.appendChild(btn);
      if (!fromMapBlock && index === 0) {
        btn.click();
      }
    });
    fromMapBlock = false;
  }

  function showImage(category, variation) {
    armyImage.src = imageMap[category][variation];
    armyImage.alt = variation;
  }

  categorySelect.addEventListener('change', updateVariations);
  updateVariations();

  fullscreenToggle.addEventListener('click', () => {
    document.body.classList.toggle('fullscreen-mode');
  });
});
