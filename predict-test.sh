
success_flag=true
success_threshold=35

for i in `seq 1 9`
do
  probability=`curl --silent -X POST -F image=@sample-numbers/$i.png http://localhost:8000/api/numeric-judge | jq ".\"$i\""`
  if test $probability -gt $success_threshold; then
    echo -e "\e[32mOK\e[m $i -> $probability%"
  else
    echo -e "\e[31mNG\e[m $i -> $probability%"
    success_flag=false
  fi
done

if $success_flag; then
  echo -e "\e[32m+ SUCCESS!!!\e[m"
  exit 0
else
  echo -e "\e[31m- FAILED...\e[m"
  exit 1
fi
