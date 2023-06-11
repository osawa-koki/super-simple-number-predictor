
for i in `seq 2 4`
do
  json=`curl -X POST -F image=@sample-numbers/$i.png http://localhost:8000/api/numeric-judge`
  echo $json | jq '.\""'
done
