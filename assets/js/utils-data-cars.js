const colors = [
    "rgb(255, 0, 0)",      // Merah
    "rgb(0, 255, 0)",      // Hijau
    "rgb(0, 0, 255)",      // Biru
    "rgb(255, 255, 0)",    // Kuning
    "rgb(255, 0, 255)",    // Magenta
    "rgb(0, 255, 255)",    // Cyan
    "rgb(128, 0, 0)",      // Maroon
    "rgb(0, 128, 0)",      // Hijau Tua
    "rgb(0, 0, 128)",      // Navy
    "rgb(128, 128, 0)",    // Olive
    "rgb(128, 0, 128)",    // Ungu
    "rgb(0, 128, 128)",    // Teal
    "rgb(255, 165, 0)",    // Jingga
    "rgb(0, 128, 128)",    // Cyan Tua
    "rgb(128, 128, 128)"   // Abu-Abu
];


        function filterBycreated(data) {
            const filteredData = {};
            
            data.forEach(item => {
                const years = new Date(item.createdAt)
                const create = years.getFullYear();
                filteredData[create] = (filteredData[create] || 0) + 1;
            });

            const result = []

            for (create in filteredData){
                if(Object.hasOwnProperty.call(filteredData,create)){
                    const count = filteredData[create];
                    result.push({create,count})
                }
            } 

            return result
        }

        function filterAndCountByModelCars(data) {
            const filteredData = {};

            data.forEach(item => {
                const model = item.modelCars;
                filteredData[model] = (filteredData[model] || 0) + 1;
            });

            const result = [];

            for (const modelCars in filteredData) {
                if (Object.hasOwnProperty.call(filteredData, modelCars)) {
                    const count = filteredData[modelCars];
                    result.push({ modelCars, count });
                }
            }

            return result;
        }

          
        function groupAndSumByYear(data) {
            const groupedData = {};

            data.forEach(item => {
                const { modelCars, count } = item;
                if (!groupedData[modelCars]) {
                    groupedData[modelCars] = 0;
                }
                groupedData[modelCars] += count;
            });

            const result = Object.keys(groupedData).map(modelCars => ({
                modelCars: modelCars,
                count: groupedData[modelCars],
            }));

            return result;
        }

        
        function filterByMerk(data) {
            const filtereteddData = {};
            
            data.forEach(item => {
                const merk = item.merk
                filtereteddData[merk] = (filtereteddData[merk] || 0) + 1;
            });

            const result = []

            for (merk in filtereteddData){
                if(Object.hasOwnProperty.call(filtereteddData,merk)){
                    const count = filtereteddData[merk];
                    result.push({merk,count})
                }
            } 

            return result
        }