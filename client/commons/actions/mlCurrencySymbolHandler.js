import gql from 'graphql-tag';


export async function fetchCurrencyTypeActionHandler (connection, userId, portfolioDetailsId) {
  const result = await connection.query({
    query: gql`
    query($userId: String, $portfolioDetailsId: String){
      fetchCurrencyType(userId: $userId, portfolioDetailsId:$portfolioDetailsId){
       countryName        
        currencyName       
        currencyCode       
        isActive           
        symbol             
        symbol_native      
        decimal_digits     
        rounding           
        name_plural        
      }
    }
    `,
    variables : {
      userId,
      portfolioDetailsId
    },
    forceFetch:true
  });
  const activities = result.data.fetchCurrencyType;
  return activities
}
