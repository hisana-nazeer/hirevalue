

export async function POST(req){

    const { prompt } = await req.json();

    const response = mistral.chatStream({
        model: 'mistral-large-latest',
        messages:[
            {
                role
            }
        ]
    })

}