function det33(matrix33) {
    return matrix33[0] * matrix33[4] * matrix33[8]
        + matrix33[1] * matrix33[5] * matrix33[6]
        + matrix33[2] * matrix33[3] * matrix33[7]
        - matrix33[2] * matrix33[4] * matrix33[6]
        - matrix33[1] * matrix33[3] * matrix33[8]
        - matrix33[0] * matrix33[5] * matrix33[7];
}

function solve33(coefficientMatrix, constant){
    const A = [...coefficientMatrix];
    const B = [...constant];

    let tempA1 = [...coefficientMatrix];
    tempA1[0] = B[0];
    tempA1[3] = B[1];
    tempA1[6] = B[2];
    const A1 = tempA1;

    let tempA2 = [...coefficientMatrix];
    tempA2[1] = B[0];
    tempA2[4] = B[1];
    tempA2[7] = B[2];
    const A2 = tempA2;

    let tempA3 = [...coefficientMatrix];
    tempA3[2] = B[0];
    tempA3[5] = B[1];
    tempA3[8] = B[2];
    const A3 = tempA3;

    const detA = det33(A);
    const detA1 = det33(A1);
    const detA2 = det33(A2);
    const detA3 = det33(A3);

    const x = detA1 / detA;
    const y = detA2 / detA;
    const z = detA3 / detA;

    return [x, y, z];
}
