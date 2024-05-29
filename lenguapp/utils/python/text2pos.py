import spacy
import sys
nlp = spacy.load("ja_core_news_sm")           # load package "en_core_web_sm"
#nlp = spacy.load("/path/to/en_core_web_sm")  # load package from a directory
#python -m spacy download ja_core_news_sm
#make env

str = """日本では、近頃多くの人が保育園問題について話している。
特に東京では十分な施設かないので、子供を保育園に入れることがとても大変だ。
今私は東京に住んでいるので、息子を保育園にいわるのは不可能だろうと思ていた。
しかし驚いたことに、息子はうけいれてもらえた。
"""

def getPos(str):
    doc = nlp(str)
    #print("text, label", [ [ent.text, ent.label ] for ent in doc.ents])
    #print("pos, head  text",[ [token.pos_, token , token.head.text] for token in doc])
    return [ [token.pos_, token , token.head.text] for token in doc ]

def test(str):
    print("hello")
    return str

print(getPos(str))

'''if __name__ == "__main__":
    test(sys.argv[2])
    print("hllo")
    sys.stdout.flush()'''