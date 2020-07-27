async function downloadData() {
    const res = await fetch('ifsc.json');
    window.ifscData = await res.json();
}

const bankState = {};
async function calculateUniqueBankList() {
    await downloadData();
    const fullBankList = ifscData.map(function (item) {
        return item.BANK;
    })
    const bankSet = new Set(fullBankList)
    bankState.uniqueBankList = Array.from(bankSet);
}

async function fillBankListIntoSelect() {
    await calculateUniqueBankList();
    document.getElementById('Bank')
    const bankSelect = document.getElementById('Bank')

    bankState.uniqueBankList.forEach(function (element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        bankSelect.add(newOption)
    })
}
fillBankListIntoSelect();

function filterListByBank(bank) {
    return ifscData.filter(function (item) {
        return item.BANK === bank;
    })
}

function fillStateListIntoSelect() {
    document.getElementById('State')
    const stateSelect = document.getElementById('State')
    bankState.uniqueStateList.sort();
    bankState.uniqueStateList.forEach(function (element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        stateSelect.add(newOption)
    })
}
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i > 0; i--) {
        selectElement.remove(i);
    }
}

document.getElementById('Bank').onchange = function () {
    bankData = filterListByBank(document.getElementById('Bank').value);
    const fullStateList = bankData.map(function (item) {
        return item.STATE;
    })
    const stateSet = new Set(fullStateList)
    bankState.uniqueStateList = Array.from(stateSet);
    removeOptions(document.getElementById('State'));
    removeOptions(document.getElementById('District'));
    removeOptions(document.getElementById('Branch'));
    fillStateListIntoSelect();
    document.getElementById('State').value = 'Select State';
    document.getElementById('District').value = 'Select District';
    document.getElementById('Branch').value = 'Select Branch';
}

function filterListByState(bank, state) {
    return ifscData.filter(function (item) {
        return item.BANK === bank && item.STATE == state;
    })
}

function fillDistrictListIntoSelect() {
    document.getElementById('District')
    const districtSelect = document.getElementById('District')
    bankState.uniqueDistrictList.sort();
    bankState.uniqueDistrictList.forEach(function (element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        districtSelect.add(newOption)
    })
}

document.getElementById('State').onchange = function () {
    stateData = filterListByState(document.getElementById('Bank').value, document.getElementById('State').value);
    const fullDistrictList = stateData.map(function (item) {
        return item.DISTRICT;
    })
    const districtSet = new Set(fullDistrictList)
    bankState.uniqueDistrictList = Array.from(districtSet);
    removeOptions(document.getElementById('District'));
    removeOptions(document.getElementById('Branch'));
    document.getElementById('District').value = 'Select District';
    document.getElementById('Branch').value = 'Select Branch';
    fillDistrictListIntoSelect();
}

function filterListByDistrict(bank, state, district) {
    return ifscData.filter(function (item) {
        return item.BANK === bank && item.STATE == state && item.DISTRICT == district;
    })
}

function fillBranchListIntoSelect() {
    document.getElementById('Branch')
    const branchSelect = document.getElementById('Branch')
    bankState.uniqueBranchList.sort();
    bankState.uniqueBranchList.forEach(function (element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        branchSelect.add(newOption)
    })
}

document.getElementById('District').onchange = function () {
    districtData = filterListByDistrict(document.getElementById('Bank').value, document.getElementById('State').value, document.getElementById('District').value);
    const fullBranchList = districtData.map(function (item) {
        return item.BRANCH;
    })
    const branchSet = new Set(fullBranchList)
    bankState.uniqueBranchList = Array.from(branchSet);
    removeOptions(document.getElementById('Branch'));
    document.getElementById('Branch').value = 'Select Branch';
    fillBranchListIntoSelect();
}

function filterListByBranch(bank, state, district, branch) {
    return ifscData.filter(function (item) {
        return item.BANK === bank && item.STATE == state && item.DISTRICT == district && item.BRANCH == branch;
    })
}


document.getElementById('find').onclick = function () {
    let queryResult=0;
    queryResult = filterListByBranch(document.getElementById('Bank').value, document.getElementById('State').value, document.getElementById('District').value, document.getElementById('Branch').value);
    const result = document.getElementById('Result')
    result.innerHTML="";
    console.log(queryResult);
    if (queryResult==0) {
        alert("Please fill all the details");
    }   
    else {
        let output = document.createElement('h2');
        output.innerText="Result for the query :-";
        result.appendChild(output);
        for (var key in queryResult[0]) {
            console.log(key);
            if (queryResult[0].hasOwnProperty(key)) {
                let outputKey = document.createElement("div");
                outputKey.setAttribute('class', 'label');
                outputKey.innerText = key;
                result.appendChild(outputKey);
                let outputValue = document.createElement("div");
                outputValue.setAttribute('class', 'dropdown');
                outputValue.innerText = queryResult[0][key];
                result.appendChild(outputValue);
            }
        }
    }
}

