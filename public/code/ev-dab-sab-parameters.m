%% Setting up the and the interpreter and font-size
list_factory = fieldnames(get(groot,'factory'));
index_interpreter = find(contains(list_factory,'Interpreter'));
for i = 1:length(index_interpreter)
   default_name = strrep(list_factory{index_interpreter(i)},'factory','default');
   set(groot, default_name,'latex');
end

set(groot,'defaultAxesFontSize',12)
%% Parameters
fsw = 100e3;
L = 300e-6;
C = 1/L/(2*pi*fsw)^2*1.7;
parallel_G = 0;
Vdc = 400;

N = 12/400;

P_max = N*400*12*pi^2/(8*100e3*L);