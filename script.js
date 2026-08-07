(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        if (typeof List === 'undefined') {
            console.error('❌ list.js no se cargó. Revisa tu conexión o la URL de la CDN.');
            return;
        }

        var options = {
            valueNames: ['name', 'category', 'description']
        };

        try {
            var productList = new List('catalog', options);

            var countSpan = document.querySelector('.count');
            if (countSpan) {
                productList.on('updated', function() {
                    countSpan.textContent = productList.visibleItems.length;
                });
                countSpan.textContent = productList.items.length;
            }

            // Inicializar eventos del Modal
            setupModal();

        } catch (e) {
            console.error('❌ Error al inicializar list.js:', e);
        }
    }

    function setupModal() {
        var modal = document.getElementById('project-modal');
        var modalImg = document.getElementById('modal-img');
        var modalTitle = document.getElementById('modal-title');
        var modalDesc = document.getElementById('modal-description');
        var closeBtn = document.querySelector('.close-btn');
        var catalogList = document.querySelector('.list');

        // Delegación de eventos para capturar el clic en cualquier imagen de la lista
        catalogList.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('product-image')) {
                var img = e.target;
                var parentLi = img.closest('li');
                
                // Obtener datos
                var titleText = parentLi.querySelector('.name').innerText;
                var fullDescription = img.getAttribute('data-full-description') || parentLi.querySelector('.description').innerText;

                // Asignar al modal
                modalImg.src = img.src;
                modalTitle.textContent = titleText;
                modalDesc.textContent = fullDescription;

                // Mostrar modal
                modal.style.display = 'flex';
            }
        });

        // Cerrar al hacer clic en el botón (X)
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Cerrar al hacer clic fuera del contenido del modal
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
})();
