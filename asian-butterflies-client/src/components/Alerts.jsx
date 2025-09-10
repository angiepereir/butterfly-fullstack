import Swal from 'sweetalert2'
export const confirmAlert = async (options = {}) => {
    if (typeof options === 'string') {
        options = { message: options };
    }
    const {
        title = "Seguro?",
        message = "Esta acción no se puede deshacer.",
        confirmText = "Sí",
        cancelText = "Cancelar"
    } = options;
    const result = await Swal.fire({
        html: `<h2 class="font-segoe text-xl font-bold text-mint-green-700">${title}</h2>
                <p class="text-mint-green-700 mt-2">${message}</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `${confirmText}`,
        cancelButtonText: `${cancelText}`,
        buttonsStyling: false, //essa opcao desativa os estilos default.
        customClass: {
            confirmButton: " py-3 px-6 rounded-lg font-segoe font-semibold cursor-pointer border-2 outline transition-colors duration-200 shadow-md bg-red-600 text-white  border-mint-green-600  hover:bg-red-600/80 hover:shadow-lg hover:scale-105 transition-transform duration-200 mr-4",
            cancelButton: "py-3 px-6 rounded-lg font-segoe font-semibold cursor-pointer border-2 outline transition-colors duration-200 shadow-md bg-white text-mint-green-700 border-mint-green-600 hover:brightness-90 hover:shadow-lg hover:scale-105 transition-transform duration-200",
        },
        willOpen: (popup) => {
            popup.style.borderRadius = '1rem'; // tailwind rounded-2xl
        }
    });

    return result.isConfirmed;
};


export const successAlert = async (options = {}) => {
    if (typeof options === 'string') {
        options = { message: options };
    }
    const {
        title = "Éxito",
        message = "Éxito",
    } = options;
    Swal.fire({
        html: `<h2 class="font-segoe text-xl font-bold text-mint-green-700">${title}</h2>
                <p class="text-mint-green-700 mt-2">${message}</p>`,
        icon: "success",
        confirmButtonText: "OK",
        buttonsStyling: false, //essa opcao desativa os estilos default.
        customClass: {
            confirmButton: "py-3 px-6 rounded-lg font-segoe font-semibold cursor-pointer border-2 outline transition-colors duration-200 shadow-md bg-lime-green text-mint-green-700 border-mint-green-600 hover:bg-lime-green/80 hover:shadow-lg hover:scale-105 transition-transform duration-200",
        },
        willOpen: (popup) => {
            popup.style.borderRadius = '1rem'; // tailwind rounded-2xl
        }
    })
};


export const errorAlert = async (options = {}) => {
    if (typeof options === 'string') {
        options = { message: options };
    }
    const {
        title = "Error",
        message = "Error",
    } = options;
    Swal.fire({
        html: `<h2 class="font-segoe text-xl font-bold text-mint-green-700">${title}</h2>
                <p class="text-mint-green-700 mt-2">${message}</p>`,
        icon: "error",
        buttonsStyling: false, //essa opcao desativa os estilos default.
        customClass: {
            confirmButton: "py-3 px-6 rounded-lg font-segoe font-semibold cursor-pointer border-2 outline transition-colors duration-200 shadow-md bg-lime-green text-mint-green-700 border-mint-green-600 hover:bg-lime-green/80 hover:shadow-lg hover:scale-105 transition-transform duration-200",
        },
        willOpen: (popup) => {
            popup.style.borderRadius = '1rem'; // tailwind rounded-2xl
        }
    })
};